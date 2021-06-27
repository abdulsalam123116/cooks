import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ContentLoader from "react-content-loader"

import Quiz from './components/Quiz.jsx';
import quizQuestions from "./api/quizQuestions";
import Result from './components/Result.jsx';
import * as Scroll from "react-scroll/modules/index";
import axios from 'axios'
import Stopwatch from './components/stoper'
export default class App extends React.Component {

    constructor(props){
        super(props);
        this.CheckAnswer = this.CheckAnswer.bind(this)
        this.renderQuiz = this.renderQuiz.bind(this)
        this.state = {
            loading: true,
            question: "",
            questionId: 2,
            answerOptions: [],
            answer: -1,
            answerCounter: 0,
            step:1,
            result: "",
            completion:"NO",
            challenge_auth:"",
            sessionId: 1623648708011,
            correct: quizQuestions[0].correct,
            color:"#36d7b7"
        }
   
    }
    componentDidMount() {
        console.log(localStorage.getItem('matched'))
        this.getNewSession().then(response => {
            this.setState({
                loading:false,
                question:response.data.question,
                answerOptions:response.data.answers,
                challenge_auth:response.data.challenge_auth,
                step:response.data.step,
                sessionId:response.data.session,
                questionId:response.data.questionid,
            })
        })
        localStorage.setItem('matched',JSON.stringify(this.state));
// // setter
// localStorage.setItem('myData', data);
 
// // getter
// localStorage.getItem('myData');
 
// // remove
// localStorage.removeItem('myData');
 
// // remove all
// localStorage.clear();
        Scroll.animateScroll.scrollTo(0);
    }    

async getNewSession()  {
    try {
        const response = await axios.get("http://127.0.0.1:3001/new_session");
        return response
    } catch (error) {
        console.log(error)        
    }
}
    
    CheckAnswer = (event) => {
        let value = event.currentTarget.value
        this.setState({
            answer: value,
            loading:true
        },function() {
            // console.log(this.state.answer)    
            // localStorage.setItem('matched', this.state);        
            this.setNextQuestion().then(response => {
                if (response.data.completion == "NO"){
                this.setState({
                    question:response.data.question,
                    completion:response.data.completion,
                    answerOptions:response.data.answers,
                    challenge_auth:response.data.challenge_auth,
                    step:response.data.step,
                    questionId:response.data.questionid,
                    loading:false
                })
                localStorage.setItem('matched', JSON.stringify(this.state));
                }
                else 
                if(response.data.completion == "OK"){
                    this.setState({
                        result:response.data.cook,
                        answerOptions:response.data.answers,
                        completion:response.data.completion,
                        challenge_auth:response.data.challenge_auth,
                        step:response.data.step,
                        questionId:response.data.questionid,
                        // loading:false
                    })
                    localStorage.clear();
                }
            })
        });

    };

  async setNextQuestion() {
        // const counter = this.state.answerCounter += 1;
        // const questionId = this.state.questionId += 1;

        // if(this.state.questionId <= 20) {
        //     this.setState({
        //         answersCounter: counter,
        //         questionId: questionId,
        //         question: quizQuestions[counter].question,
        //         answerOptions: quizQuestions[counter].answers,
        //         correct: quizQuestions[counter].correct
        //     });
        // }
        try {
        const values = {
            answer:this.state.answer,
            session_id:this.state.sessionId,
            questionid:this.state.questionId,
            question:this.state.question,
            step:this.state.step,
            challenge_auth:this.state.challenge_auth
            
        }
            const response = await axios.post("http://127.0.0.1:3001/answer_api",values);
            console.log(response)
            return response
        } catch (error) {
            console.log(error)        
        }   
    };

    renderQuiz () {

        return(
            
            <ReactCSSTransitionGroup
                className="container"
                component="div"
                transitionName="fade"
                transitionEnterTimeout={800}
                transitionLeaveTimeout={800}
                transitionAppear
                transitionAppearTimeout={800}
            >
             
            <Quiz
                question={this.state.question}
                questionId={this.state.questionId}
                questionTotal={this.state.step}
                step={this.state.step}
                answerOptions={this.state.answerOptions}
                answerCallback={this.CheckAnswer}
            />
            
            </ReactCSSTransitionGroup>
            
        )
    }

    finishQuiz() {
        return(
            <Result quizResult={this.state.result} questions={this.state.questionId}/>
        )
    }

    render(){
      const abd = {
   
      }
        return(
            <div>
            {this.state.loading ? (
                <ContentLoader 
                speed={1}
                width={"100%"}
                height={500}
                viewBox="0 0 500 500"
                backgroundColor="#404d4f"
                foregroundColor="#ecebeb"
                style={abd}
              >
                <circle cx="65" cy="260" r="13" /> 
                <rect x="100" y="250" rx="5" ry="5" width="300" height="15" /> 

                <circle cx="65" cy="355" r="13" /> 
                <rect x="100" y="345" rx="5" ry="5" width="300" height="15" /> 

                <circle cx="65" cy="430" r="13" /> 
                <rect x="100" y="420" rx="5" ry="5" width="300" height="15" /> 

                <rect x="40" y="150" rx="10" ry="10" width="400" height="25" />
                <rect x="182" y="60" rx="10" ry="10" width="135" height="25" />
                <circle cx="250" cy="100" r="12" /> 

              </ContentLoader>
            ) : (
                <div className="App">
                    <div>
                        {this.state.completion == "NO"
                        ? this.renderQuiz() :this.finishQuiz()}
                    </div>
                </div>)}
                <Stopwatch />
</div>
            
        )
    }
}