import FormRepository from "./FormRepository";

export default class CopyForm {
    constructor(readonly formRepository: FormRepository) {}

    async execute(input: Input) {
        const form = await this.formRepository.getById(input.fromFormId);
        const newForm = form.clone();
        newForm.description = input.newDescription;
        newForm.category = input.newCategory;
        newForm.formId = input.newFormId;
        await this.formRepository.save(newForm);
    }
}

type Input = {
    fromFormId: string;
    newFormId: string;
    newCategory: string;
    newDescription: string;
};
