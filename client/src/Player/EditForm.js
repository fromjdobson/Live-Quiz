import React, { Component } from 'react'
import { withQuestion } from '../QuestionProvider'
import axios from 'axios'

class EditFrom extends Component {
    constructor(){
        super()
        this.state = {
            question: '',
            answerA: '',
            answerB: '',
            answerC: '',
            answerD: '',
            category: ''
        }
    }
    componentDidMount(){
        this.setState(prev => { 
            return (prev = this.props.props)
        })
    }

    handleChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }

    render(){
        let { question, answerA, answerB, answerC, answerD, category, _id } = this.state
        
        const handleSubmit = (e) => {
            e.preventDefault()
            const updated = {
                question, answerA, answerB, answerC, answerD, category, editQuestion: false
            }
        
            axios.put(`/questions/${_id}`,  updated).then(res => {
                this.props.updateStateWithEditedQuestions(res.data)
                console.log(res.data)
            })
            
            
        }
        return(
            <div>
                <form onSubmit = { handleSubmit }>
                    <input type="text" name = 'question' value = { question } onChange = {this.handleChange} />
                    <input type="text" name = 'answerA' value = { answerA } onChange ={this.handleChange} />
                    <input type="text" name = 'answerB' value = { answerB } onChange ={this.handleChange} />
                    <input type="text" name = 'answerC' value = { answerC } onChange ={this.handleChange} />
                    <input type="text" name = 'answerD' value = { answerD } onChange ={this.handleChange} />
                    <input type="text" name = 'category' value = { category } onChange = { this.handleChange } />
                    
                    <button>Edit From Props</button>
                </form>
            </div>
        )
    }
}


export default withQuestion(EditFrom)