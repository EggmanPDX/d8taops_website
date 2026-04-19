document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Navigation Blur on Scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.75rem 0';
        } else {
            header.style.padding = '1rem 0';
        }
    });

    // 3. Scramble Text Logic (React TextScramble replacement)
    const scrambleEl = document.getElementById('scramble-text');
    if (scrambleEl) {
        const phrases = ['AI', 'Models', 'Analytics', 'Scale'];
        const chars = '!<>-_\\\\/[]{}—=+*^?#_';
        let currentPhrase = 0;
        let isScrambling = false;

        const scramble = (newText, callback) => {
            const oldText = scrambleEl.innerText;
            const length = Math.max(oldText.length, newText.length);
            const queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                queue.push({ from, to, start, end, char: '' });
            }

            let frame = 0;
            const update = () => {
                let output = '';
                let complete = 0;
                for (let i = 0, n = queue.length; i < n; i++) {
                    let { from, to, start, end, char } = queue[i];
                    if (frame >= end) {
                        complete++;
                        output += to;
                    } else if (frame >= start) {
                        if (!char || Math.random() < 0.28) {
                            char = chars[Math.floor(Math.random() * chars.length)];
                            queue[i].char = char;
                        }
                        output += `<span style="color:rgba(255,255,255,0.4)">${char}</span>`;
                    } else {
                        output += from;
                    }
                }
                scrambleEl.innerHTML = output;
                if (complete === queue.length) {
                    if (callback) callback();
                } else {
                    frame++;
                    requestAnimationFrame(update);
                }
            };
            cancelAnimationFrame(isScrambling);
            isScrambling = requestAnimationFrame(update);
        };

        const nextPhrase = () => {
            currentPhrase = (currentPhrase + 1) % phrases.length;
            scramble(phrases[currentPhrase], () => {
                setTimeout(nextPhrase, 2500);
            });
        };
        setTimeout(nextPhrase, 2500);
    }

    // 4. Particle Canvas
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let w, h;
        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(draw);
        };
        draw();
    }

    // 5. Ingest Demo Logic
    const term = document.getElementById('terminal-output');
    const container = document.getElementById('canvas-container');
    if (term && container) {
        const jobs = [
            "Connecting to Oracle DB cluster...",
            "Found 4,000,000 rows. Normalizing...",
            "Redacting PII found in payload...",
            "Handing off to D8:CLEAN agent..."
        ];
        let j = 0;
        setInterval(() => {
            term.innerHTML += `<div>[${new Date().toISOString().split('T')[1].slice(0,8)}] Ingest: ${jobs[j]}</div>`;
            term.scrollTop = term.scrollHeight;
            j = (j + 1) % jobs.length;
        }, 1500);

        // Simple node animation wrapper
        const node = document.createElement('div');
        node.className = 'floating-node node-active';
        node.innerHTML = '<i data-lucide="layers"></i>D8:INGEST';
        container.appendChild(node);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        let angle = 0;
        const cx = container.offsetWidth / 2 - 30;
        const cy = container.offsetHeight / 2 - 30;
        setInterval(() => {
            angle += 0.02;
            const r = 80;
            node.style.left = `${cx + Math.cos(angle) * r}px`;
            node.style.top = `${cy + Math.sin(angle) * r}px`;
        }, 16);
    }

    // 6. Agents Grid
    const agentGrid = document.getElementById('agent-grid');
    if (agentGrid) {
        const agents = [
            { icon: 'database', title: 'D8:INGEST', desc: 'Secure connection to sources.' },
            { icon: 'filter', title: 'D8:CLEAN', desc: 'Deduplicates & standardizes queries.' },
            { icon: 'shield', title: 'D8:GOVERN', desc: 'Enforces RBAC and privacy.' },
            { icon: 'file-text', title: 'D8:CAT', desc: 'Classifies unstructured docs.' },
            { icon: 'search', title: 'D8:SEARCH', desc: 'Hybrid RAG retrieval system.' },
            { icon: 'network', title: 'D8:GRAPH', desc: 'Maps relationships.' },
            { icon: 'cpu', title: 'D8:EXEC', desc: 'Runs LLM tasks autonomously.' },
            { icon: 'layout-dashboard', title: 'D8:VIEW', desc: 'Surfaces insights.' }
        ];

        agentGrid.innerHTML = agents.map(a => `
            <div class="card" style="box-shadow: none; border-color: var(--color-border); padding: 2rem;">
                <div class="agent-icon"><i data-lucide="${a.icon}"></i></div>
                <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-navy);">${a.title}</h3>
                <p style="font-size: 0.9rem; color: var(--color-grey-dark); m-0">${a.desc}</p>
            </div>
        `).join('');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
});
