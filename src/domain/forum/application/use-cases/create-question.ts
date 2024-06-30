import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { AnswerRepository } from '../repositories/answer-repository'
import { QuestionsRepository } from '../repositories/questions-repository';

interface CreateQuestionUsecaseRequest {
    authorId: string
    title: string
    content: string
}

interface CreateQuestionUsecaseResponse {
    question: Question
}
  

export class CreateQuestionUsecase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content
  }: CreateQuestionUsecaseRequest): Promise<CreateQuestionUsecaseResponse> {
    const question = Question.create({
        authorId: new UniqueEntityID(authorId),
        title,
        content
    })

    await this.questionsRepository.create(question)

    return ({
        question
    })
  }
}
