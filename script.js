document.addEventListener('DOMContentLoaded', () => {
    // --- Alternância de Tema (Modo Escuro / Claro) ---
    const themeBtn = document.getElementById('theme-btn');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeBtn.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
    });

    // --- Expansão dos Cards ---
    const toggleButtons = document.querySelectorAll('.btn-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const textElement = document.getElementById(targetId);
            const isExpanded = textElement.classList.toggle('expanded');
            
            button.querySelector('span').textContent = isExpanded ? 'Ler menos' : 'Ler mais';
            button.innerHTML = isExpanded 
                ? '<span>Ler menos</span> &uparrow;' 
                : '<span>Ler mais</span> &downarrow;';
        });
    });

    // --- Efeito de Teias de Aranha ao Clicar ---
    const canvas = document.getElementById('web-canvas');
    const ctx = canvas.getContext('2d');
    let webs = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class SpiderWeb {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = Math.random() * 40 + 50;
            this.spokes = Math.floor(Math.random() * 4) + 6; // 6 a 9 raios
            this.rings = 4;
            this.opacity = 1;
            this.growthSpeed = 4;
            this.fadeSpeed = 0.02;
        }

        update() {
            if (this.radius < this.maxRadius) {
                this.radius += this.growthSpeed;
            } else {
                this.opacity -= this.fadeSpeed;
            }
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.lineWidth = 1.2;

            // Desenhar os raios principais da teia
            for (let i = 0; i < this.spokes; i++) {
                const angle = (Math.PI * 2 / this.spokes) * i;
                const endX = this.x + Math.cos(angle) * this.radius;
                const endY = this.y + Math.sin(angle) * this.radius;
                
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(endX, endY);
            }

            // Desenhar os anéis concêntricos da teia
            const currentRings = Math.floor((this.radius / this.maxRadius) * this.rings);
            for (let r = 1; r <= currentRings; r++) {
                const rRadius = (this.radius / this.rings) * r;
                
                for (let i = 0; i < this.spokes; i++) {
                    const angle1 = (Math.PI * 2 / this.spokes) * i;
                    const angle2 = (Math.PI * 2 / this.spokes) * ((i + 1) % this.spokes);
                    
                    const p1x = this.x + Math.cos(angle1) * rRadius;
                    const p1y = this.y + Math.sin(angle1) * rRadius;
                    const p2x = this.x + Math.cos(angle2) * rRadius;
                    const p2y = this.y + Math.sin(angle2) * rRadius;

                    ctx.moveTo(p1x, p1y);
                    ctx.quadraticCurveTo(
                        this.x + Math.cos((angle1 + angle2) / 2) * (rRadius * 0.9),
                        this.y + Math.sin((angle1 + angle2) / 2) * (rRadius * 0.9),
                        p2x, p2y
                    );
                }
            }

            ctx.stroke();
            ctx.restore();
        }
    }

    // Criar teia no local do clique
    window.addEventListener('click', (e) => {
        // Evita criar teia se o clique for no botão de alternar tema
        if (e.target.closest('#theme-btn')) return;
        
        webs.push(new SpiderWeb(e.clientX, e.clientY));
    });

    // Loop de animação
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        webs = webs.filter(web => web.opacity > 0);
        webs.forEach(web => {
            web.update();
            web.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});