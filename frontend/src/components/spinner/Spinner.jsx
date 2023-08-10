
import spinner from '../../assets/images/spinner.gif'

export default function Spinner() {
  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        background: '#000000'
    }}>
        <img 
            style={{
                width: '2rem'
            }}
            src={spinner} 
            alt="spinner" 
        />
    </div>
  )
}
