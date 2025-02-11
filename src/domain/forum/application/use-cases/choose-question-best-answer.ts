
import { AnswersRepository } from '../repositories/answers-repository'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface ChooseQuestionBestAnswerCaseRequest {
  answerId: string
  authorId: string
}

type ChooseQuestionBestAnswerResponse = Either<ResourceNotFoundError | NotAllowedError, {
  question: Question
}
>
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
        return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(answer.questionId.toValue())

    if(!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId != question.authorId.toString()) {
        return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return right({
      question
  })
  }
}
