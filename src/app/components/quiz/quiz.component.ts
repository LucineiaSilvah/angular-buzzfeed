import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quizz_questions.json'
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  title:string =''
//pega o json
  questions:any

//pega a questao sa vez
  questionSelected:any
//resultado
  answers:string[]=[]
  answersSelected:string=''
//ponteiro
  questionIndex:number=0
  questionMaxIndex:number=0
  finished:boolean=false
  constructor() { }

  ngOnInit(): void {
    if (quiz_questions) {
this.finished=false
this.title = quiz_questions.title

this.questions = quiz_questions.questions
this.questionSelected =  this.questions[this.questionIndex]

this.questionIndex =0
this.questionMaxIndex=this.questions.length

    }
  }

  playerChoose(value:string){
  this.answers.push(value)
  this.nextStep()

  }
 async nextStep(){
    this.questionIndex += 1
    if (this.questionMaxIndex > this.questionIndex) {
    this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string  = await this.checkResult(this.answers)
     this.finished =true
     this.answersSelected = quiz_questions.results[finalAnswer as keyof  typeof quiz_questions.results]
//verificar opção ganhadora


    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous,current, index, arr)=>{
     if(
      arr.filter(item=> item === previous).length >
      arr.filter(item=> item === current).length){
     return previous
     }else{
     return current
     }
    })
    return result
  }


}
