import CopyForm from "./CopyForm"
import Form from "./Form";
import { FormRepositoryMemory } from "./FormRepository";

test("Deve copiar um formulário", async () => {
    const formRepository = new FormRepositoryMemory();
    const form = new Form("1", "Marketing", "Leads v1");
    form.addField("text", "name");
    form.addField("email", "email");

    await formRepository.save(form);

    const copyForm = new CopyForm(formRepository);

    const input = {
        fromFormId: "1",
        newFormId: "2",
        newCategory: "Marketing",
        newDescription: "Leads v2"
    }

    await copyForm.execute(input);

    const newForm = await formRepository.getById("2");

    expect(newForm.fields).toStrictEqual(form.fields);
    expect(newForm.description).toBe("Leads v2");
});
