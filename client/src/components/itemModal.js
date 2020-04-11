import React from 'react'
import {connect} from 'react-redux'
import {Modal,Button,ModalBody,ModalHeader,Form,FormGroup,Label,Input, ModalFooter} from 'reactstrap'
import {addItem} from '../actions/itemactions'


class ItemModal extends React.Component{
    
    state={
        modal:false,
        itemname:'',
        count:1
    }

    toggle = ()=>{
        this.setState({
            modal: !this.state.modal
        })
    }

    handleSubmit=(e)=>{

        e.preventDefault()

        const newItem = {
            list_id: this.props.listid,
            items:[
                {
                item: this.state.itemname,
                count: this.state.count
                }
            ]
        }
        this.props.addItem(newItem)

        this.toggle()
        
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    render(){
        return(
            <div>
                <Button
                color='dark'
                onClick={this.toggle}
                > Add item</Button>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add item to the list </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for='item'>Item</Label>
                                <Input name="itemname" id="itemname" type='text' placeholder='add an item' onChange={this.handleChange}></Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='dark' block onClick={this.handleSubmit}>
                            Add
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = (state) =>({
    lists : state.productlist.items
})

export default connect(mapStateToProps,{addItem})(ItemModal)