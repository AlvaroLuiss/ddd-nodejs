import { UniqueEntityID } from '../../core/entities/unique-entity-id'
import { Answer } from '../entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface AnswerQuestionUsecaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUsecase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUsecaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return answer
  }
}
