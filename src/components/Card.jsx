

function Card(props){
    return( 
    <div style={{ background: 'lightgrey', padding: 4, margin: 10, borderRadius: 5, width: 250}}>
    <h1>{props.title}</h1>
    <h3>{props.amount}</h3>
    </div>
)
}

export default Card