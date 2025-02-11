import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-questions-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionsCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionsCommentsRepository)
  })

  it('should be able to fetch questions comment', async () => {
    await inMemoryQuestionsCommentsRepository.create(makeQuestionComment({
        questionId: new UniqueEntityID('question-1')
    }))

    await inMemoryQuestionsCommentsRepository.create(makeQuestionComment({
        questionId: new UniqueEntityID('question-1')
    }))

    await inMemoryQuestionsCommentsRepository.create(makeQuestionComment({
        questionId: new UniqueEntityID('question-1')
    }))

    const result = await sut.execute({
        questionId: 'question-1',
        page: 1
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comment', async () => {
    for (let i = 1; i <= 22; i++){
      await inMemoryQuestionsCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID('question-1') }))
    }

    const result = await sut.execute({
        questionId: 'question-1',
        page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
