import './music.css'

const music = () => {
    return (
        <div className='musica'>
            <audio controls autoplay>
                <source src="./assets/shine.mp3" type="audio/mp3" />
                Tu navegador no soporta el elemento de audio.
            </audio>       
        </div>
    )
}

export default music