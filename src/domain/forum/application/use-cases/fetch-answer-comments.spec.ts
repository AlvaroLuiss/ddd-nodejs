import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comment', async () => {
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({
        answerId: new UniqueEntityID('question-1')
    }))

    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({
        answerId: new UniqueEntityID('question-1')
    }))

    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({
        answerId: new UniqueEntityID('question-1')
    }))

    const { answerComments } = await sut.execute({
        answerId: 'question-1',
        page: 1
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comment', async () => {
    for (let i = 1; i <= 22; i++){
      await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityID('question-1') }))
    }

    const { answerComments } = await sut.execute({
        answerId: 'question-1',
        page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })
})
