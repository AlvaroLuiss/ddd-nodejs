import { expect } from 'vitest'
import { CreateQuestionUsecase } from './create-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: CreateQuestionUsecase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository
    sut = new CreateQuestionUsecase(inMemoryQuestionsRepository)
  })

  it('Should be able to create a question', async () => {
    const {question} = await sut.execute({
      authorId: '1',
      title: 'New question',
      content: 'content of question'
    })
  
    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
  
})

