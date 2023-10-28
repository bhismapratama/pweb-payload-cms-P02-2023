import payload from 'payload';

const createChangelogEntry = async (type, name, action) => {
    await payload.create({
        collection: 'changelog',
        data: { type, name, action },
    });
};

const Todo = {
    slug: 'todo',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        create: () => true,
        read: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'publishedDate',
            type: 'date',
            label: 'Published Date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                    displayFormat: 'd MMM yyy h:mm:ss a',
                },
            },
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            options: [
                {
                    value: 'not started',
                    label: 'Not Started',
                },
                {
                    value: 'on progress',
                    label: 'On Progress',
                },
                {
                    value: 'completed',
                    label: 'completed',
                },
            ],
            defaultValue: 'not started',
            admin: {
                position: 'sidebar',
            },
        },
    ],
    hooks: {
        afterOperation: [
            async (args) => {
                if (args.operation == 'create') {
                    await createChangelogEntry('Todo', args.result.title, 'Created');
                }
            },
        ],
        afterChange: [
            async (args) => {
                if (args.operation == 'update') {
                    await createChangelogEntry('Todo', args.doc.title, 'Updated');
                }
            },
        ],
        afterDelete: [
            async (args) => {
                await createChangelogEntry('Todo', args.doc.title, 'Deleted');
            },
        ],
    },
};

export default Todo;
