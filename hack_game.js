document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const count = 0
    
    const username = document.getElementById('username').value;
    const add_likes = document.getElementById('add_likes').checked
    form.addEventListener('submit', async (event) => {
        const terminal = document.getElementById('terminal');
        const added = ['Joined Successfully']
        
        console.log('Culo de mierda',add_likes)
        if (add_likes === false) added.push('Added Like');

        let logi = 1
        let logIndex = 0

        function addLog() {
            const log = document.createElement('p');
            
            log.textContent = `[${logi}] ` +added[logIndex];
            terminal.appendChild(log);
            terminal.scrollTop = terminal.scrollHeight; // Auto-scroll
            logi += 1
        
            if (logIndex === 1) {
                logIndex = 0
            } else {
                logIndex += 1
            }
            
        }

        // Add logs at intervals
        setInterval(addLog, 500);
    });
});