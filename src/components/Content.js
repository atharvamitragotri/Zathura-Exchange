import React,{Component} from 'react'
import {connect} from 'react-redux'
import {loadAllOrders, subscribeToEvents} from '../store/interactions'
import {exchangeSelector} from '../store/selectors'
import Trades from './Trades'
import Orderbook from './Orderbook'
import MyTransactions from './MyTransactions'
import PriceChart from './PriceChart'
import Balance from './Balance'
import NewOrder from './NewOrder'

class Content extends Component{
  componentDidMount(){
    this.loadBlockChainData(this.props)
  }

  async loadBlockChainData(props){
    const {dispatch, exchange} = props
    await loadAllOrders(exchange, dispatch)
    await subscribeToEvents(dispatch, exchange)
  }

    render(){
        return(
            <div className="content">
          <div className="vertical-split">
            <Balance/>
            <NewOrder/>
          </div>

          <Orderbook/>
          
          <div className="vertical-split">
            <PriceChart/>
            <MyTransactions/>
          </div>
          <Trades/>
        </div>
        )
    }
}

function mapStateToProps(state){
    return{
      exchange : exchangeSelector(state)
    }
}

export default connect(mapStateToProps)(Content)