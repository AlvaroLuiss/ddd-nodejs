import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"

interface InstructoProps {
    name: string
}

export class Instructor extends Entity<InstructoProps> {
    static create(
        props: InstructoProps, 
        id?: UniqueEntityID
    ) {
        const instructor = new Instructor(props, id)

        return instructor
    }
}