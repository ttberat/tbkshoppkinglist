import React from 'react'
import { Button, Container,ListGroup,ListGroupItem,Spinner } from 'reactstrap'
import {CSSTransition} from 'react-transition-group'
import {connect} from 'react-redux'
import {getItems, deleteItem} from '../actions/itemactions'
import ItemModal from './itemModal'
import '../App.css'

class MyList extends React.Component{

    
    componentDidMount(){ 
        this.props.getItems()
    }
   
    
    onDeleteClick =(itemid,listid)=>{
       const data ={
            item_id:itemid,
            list_id:listid
        }
        //console.log(data)
        this.props.deleteItem(data)
    }

    render(){
        const lists = {...this.props.lists[0]}
        return(
            <div>
                <Container>
                    <h1>{lists.productlist}</h1>
                    <ItemModal listid={lists._id}/>  
                    {this.props.loading &&  <Spinner color="danger" />}
                    {lists.items!==undefined && lists.items.map((item)=>(
                    <ListGroup key={item._id} >
                        <CSSTransition  timeout={500}>
                            <ListGroupItem >
                                <Button  color='danger' size='sm' 
                                onClick={this.onDeleteClick.bind(this,item._id,lists._id)}
                                >X</Button>{'    '}
                                {item.item}
                            </ListGroupItem>
                        </CSSTransition>
                    </ListGroup>
                    ))}
                </Container>
            </div>
        )
    }
}



const mapStateToProps = (state) =>({
    lists : state.productlist.items,
    loading: state.productlist.loading
})

export default connect(mapStateToProps, {getItems, deleteItem} )(MyList)