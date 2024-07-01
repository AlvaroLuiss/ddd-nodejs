
import { AnswersRepository } from '../repositories/answers-repository'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ChooseQuestionBestAnswerCaseRequest {
  answerId: string
  authorId: string
}

interface ChooseQuestionBestAnswerResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
) {}

  async execute({
    answerId,
    authorId
  }: ChooseQuestionBestAnswerCaseRequest): Promise<ChooseQuestionBestAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if(!answer) {
        throw new Error('Answer not found.')
    }

    const question = await this.questionRepository.findById(answer.questionId.toValue())

    if(!question) {
        throw new Error('Question not found.')
    }

    if (authorId != question.authorId.toString()) {
        throw new Error('Not allowed')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
        question
    }
  }
}
