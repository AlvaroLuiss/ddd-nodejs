import { QuestionsCommentsRepository } from '@/domain/forum/application/repositories/questions-comments-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository implements QuestionsCommentsRepository {
  public items: QuestionComment[] = []

 
  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
