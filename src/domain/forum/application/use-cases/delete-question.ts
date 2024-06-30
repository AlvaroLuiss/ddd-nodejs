import { QuestionsRepository } from '../repositories/questions-repository';

interface DeleteQuestionUsecaseRequest {
    authorId: string
    questionId: string
}

interface DeleteQuestionUsecaseResponse {}
  
export class DeleteQuestionUsecase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId
  }: DeleteQuestionUsecaseRequest): Promise<DeleteQuestionUsecaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if(!question) {
        throw new Error('Question not found.')
    }

    if(authorId !== question.authorId.toString()) {
        throw new Error('Not allowed.')
    }
    
    await this.questionsRepository.delete(question)

    return {}
  }
}
