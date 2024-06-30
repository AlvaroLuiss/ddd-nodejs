import { InMemoryAnswersRepository } from 'test/repositories/in-memmory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUsecase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUsecase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUsecase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1'
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })


  it('should be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: 'answer-1'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})