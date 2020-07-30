import  React, {  Component } from 'react'

import './sass/globals.scss';

import Image from './Components/core/Image';
import { object } from 'prop-types';

class App extends Component {
  constructor(state){
    super(state)
    this.state = {
      pokeList : [],
      pokeActive : {
        name : "Pokedex",
        height : 0,
        weight : 0,
        type : "none"
      },
      pokeTabNext : "",
      pokeTabPrevious : "",
    }

    this.pokeCallInfo = this.pokeCallInfo.bind(this)
  }
  
  pokeCallInfo(pokemon){

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then(res => res.json())
      .then(json => {    
        var typeArr = [];
        console.log(json)
        json.types.map((object)=> typeArr.push(object.type.name) )       
        this.setState({
          pokeActive : {
            uri : json.sprites.other.dream_world.front_default,
            name : json.name,
            height : json.height,
            weight : json.weight,
            type : typeArr.join(", "),
          },
        })
        //console.log(this.state.pokeActive)        
    })    
  }

  componentDidMount(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`)
      .then(res => res.json())
      .then(json => {
        console.log("pokeList",json.results.length)
        var pokeList = [];

        json.results.map((object)=>
            fetch(`https://pokeapi.co/api/v2/pokemon/${object.name}`)
            .then(res => res.json())
            .then(json => {    
              pokeList.push(json)       
          })    
        );
        this.pokeCallInfo(json.results[0])
        this.setState({
          pokeList,
          pokeTabNext : json.next,
          pokeTabPrevious : json.previous,
        })        
    })
  }

  render(){
    return(
        <div className="container-fluid px-0">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <div className="row mx-0">
                  <div className="col-6">
                    <Image uri={this.state.pokeActive.uri} />
                  </div>
                  <div className="col-6">
                    <div className="container">
                      <h1 className="display-4 text-uppercase">{this.state.pokeActive.name}</h1>
                      <p className="lead">Height : {this.state.pokeActive.height} m</p>
                      <p className="lead">Weight : {this.state.pokeActive.weight} kg</p>
                      <p className="lead">Type : {this.state.pokeActive.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mx-0 row-cols-2 row-cols-lg-5">
              {
              (this.state.pokeList.length > 0 ? 
                this.state.pokeList.map((pokemon, i) => {
                  console.log(pokemon.name)
                  return (<div className="col mb-4" key={i}>
                    <div className="card text-center" onClick={()=>this.pokeCallInfo(pokemon)}>
                      <img src={pokemon.sprites.other.dream_world.front_default} className="card-img-top mx-auto" alt={pokemon.name} />
                      <div className="card-body">
                        <h5 className="card-title text-uppercase">{pokemon.name}</h5>                        
                      </div>
                    </div>
                  </div>)
              }) : "Landing ..." )
              }

            </div>
        </div>
    );
  }
}





// const App = () => {

//   const [offset, setOffset] = useState(0);
//   const [limit, setLimit] = useState(100);
//   const [list, setList] = useState([]);

//   const handler = {
//     offset : (function(val){
//       setOffset(val)
//       console.log('setOffset', offset)
//     }),
//     limit : (function(val){
//       setLimit(val)
//       console.log('setLimit', limit)
//     }),
//     list : (function(val){
//       setList(val)
//       console.log('setList', list)
//     }),
//     API : (function(offset,limit){
//       fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
//         .then(res => res.json())
//         .then(json => {
//           console.log(json)
//       })
//     })
//   }

//   return(
//       <div className="container-fluid px-0">
//           <div className="jumbotron jumbotron-fluid">
//             <div className="container">
//               <div className="row mx-0">
//                 <div className="col-6">
//                   <Image />
//                 </div>
//                 <div className="col-6">
//                   <div className="container">
//                     <h1 className="display-4">Fluid jumbotron</h1>
//                     <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//       </div>
//   );
// }

export default App;
