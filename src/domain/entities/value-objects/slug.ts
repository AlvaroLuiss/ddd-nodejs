export class Slug {
    public value: string

    constructor(value: string) {
        this.value = value 
    }

    /**
     * Receives a string and normalized as a slug.
     * 
     * Example: "An example title" => "an-example-title"
     * 
     * @param text {string}
     */

    static createFromText(text: string) {
        const slugtext = text
            .normalize("NFKD")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/_/g, '-')
            .replace(/--+/g, '-')
            .replace(/-$/g, '')

            return new Slug(slugtext)
    }
}