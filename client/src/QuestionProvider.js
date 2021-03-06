import React, { Component } from 'react'
import axios from 'axios'

const { Consumer, Provider } = React.createContext()

class QuestionProvider extends Component{
    constructor (){
        super ()
        this.state = {
            playerName: 'Welcome To The Game',
            quizStarted: false,
            score: 0,
            indexOfQuestion: 0,
            question: '',
            quizQuestion: [],
            addQuestion: false,
            questions: [{
                question: 'Question what if the wuestion is way to big for the sinlge line',
                answerA: "answer A",
                answerB: "answer B",
                answerC: "answer C",
                answerD: "answer D",
                category: 'teststate',
                funFact: 'funfact',
                editQuestion: true,
                _id: 'fjkdsljfdsk',
                correctAnswers: ["answer C", "answer D" ],
                time: 10
            
            }],
            updateQuestion: {
                question: 'Question',
                answerA: "answer A update",
                answerB: "answer B update",
                answerC: "answer C update",
                answerD: "answer D update",
                category: 'teststate',
                funFact: 'funfact'
            }
        }
    }
    componentDidMount(){
        axios.get('/questions/').then(res => {
            this.setState({quizQuestion: res.data})
        })
    }
    beginQuiz = () => {
        this.setState({ quizStarted: true })
    }
    endQuiz = () => {
        this.setState({ quizStarted: false,
                        indexOfQuestion: 0,
                        quizLength: 0,
                        score: 0,
                        playerName: ''            
        })

    }

    addToScore = (pointsToAdd) => {
        return (
            this.setState(prev => {
                return({ score: prev.score += pointsToAdd,
                        indexOfQuestion: (prev.indexOfQuestion +=1)
                })
            })
        )
    }

    updateStateWithEditedQuestions = (editedQuestions) => {
        
        return(
            this.setState(prev => {
                const updatedQuestions = prev.questions.map(question => editedQuestions._id === question._id ? Object.assign(question, editedQuestions): question )
                return({questions : updatedQuestions})
            })
        )
    }
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    namePlayer = (name) => this.setState({playerName: name})

    toggle = (index, whatToToggle) => {
        
        this.setState(prev => {
            const updatedQuestion = prev.questions[index]
            updatedQuestion.editQuestion = !whatToToggle
            prev.questions.splice(index, 1, updatedQuestion)
            return ({questions: prev.questions})
        })
    }

    shuffle = (array) => {
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
          }
          return array
    }
   
    getCategoryQuestions = (category) => {
        axios.get(`/questions/?category=${category}`).then(res => {
            this.setState({questions: res.data,
                           quizLength: res.data.length })
        })
        this.beginQuiz()
    }
    showAddQuestion = () => {
        this.setState({addQuestion: true})
    }
    hideAddQuestion = () => {
        this.setState({addQuestion: false})
    }

    render (){
        return(
            <Provider value = {{ ...this.state,
                                getCategoryQuestions: this.getCategoryQuestions,
                                shuffle: this.shuffle,
                                handleChange: this.handleChange,
                                toggle: this.toggle,
                                showAddQuestion: this.showAddQuestion,
                                hideAddQuestion: this.hideAddQuestion,
                                addToScore: this.addToScore,
                                namePlayer: this.namePlayer,
                                updateStateWithEditedQuestions: this.updateStateWithEditedQuestions,
                                beginQuiz: this.beginQuiz,
                                endQuiz: this.endQuiz
                   }}>
                { this.props.children }
            </Provider>
        )
    }
}

export default QuestionProvider

export const withQuestion = (Comp) => {
    return(props) => <Consumer>
        {value => <Comp { ...value } { ...props } />}
    </Consumer>
}