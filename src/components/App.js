import React,{ Component } from 'react'
import Web3 from 'web3'
import './App.css'
import Token from '../abis/Token.json'
import Navbar from './Navbar'
import Content from './Content'
import { loadWeb3, loadAccount, loadToken, loadExchange} from '../store/interactions'
import { connect } from 'react-redux'
import { accountSelector, contractLoadedSelector } from '../store/selectors'


class App extends Component{
  componentDidMount(){
    this.loadBlockChainData(this.props.dispatch)
  }
  // UNSAFE_componentWillMount() {
  //   this.loadBlockChainData(this.props.dispatch)
  // }

  async loadBlockChainData(dispatch){
    const web3 = await loadWeb3(dispatch)
    const networkID = await web3.eth.net.getId()
    const account = await loadAccount(web3, dispatch)
    const token = await loadToken(web3, networkID, dispatch)
    if(!token){
      window.alert("Token smart contract not detected on the currrent network. Please select another network with Metamask.")
    }
    const exchange = await loadExchange(web3,networkID,dispatch)
    if(!exchange){
      window.alert("Exchange smart contract not detected on the currrent network. Please select another network with Metamask.")
    }
    // const totalSupply = await token.methods.totalSupply().call()
    // console.log("totalSupply",totalSupply)
    // const networkId = await web3.eth.net.getId()
  }

  render() {
    return (
      <div>
        <Navbar/>
        {this.props.contractsLoaded ? <Content/> : <div className="content"></div>}
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    contractsLoaded:contractLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(App);

// export default App;
