import { AnswerRepository } from '../repositories/answer-repository';

interface DeleteAnswerUsecaseRequest {
    authorId: string
    answerId: string
}

interface DeleteAnswerUsecaseResponse {}
  
export class DeleteAnswerUsecase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId
  }: DeleteAnswerUsecaseRequest): Promise<DeleteAnswerUsecaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if(!answer) {
        throw new Error('Answer not found.')
    }

    if(authorId !== answer.authorId.toString()) {
        throw new Error('Not allowed.')
    }
    
    await this.answersRepository.delete(answer)

    return {}
  }
}
