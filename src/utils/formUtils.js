import { v4 as uuidv4 } from 'uuid';

export const createQuestion = () => ({
    id: uuidv4(),
    text: '',
    type: 'Short Answer', // or 'True/False'
    mockAnswer: '', // 'True' or 'False' (used for UI preview of condition)
    children: []
});

export const updateQuestionInTree = (questions, id, updates) => {
    return questions.map(q => {
        if (q.id === id) {
            return { ...q, ...updates };
        }
        if (q.children && q.children.length > 0) {
            return { ...q, children: updateQuestionInTree(q.children, id, updates) };
        }
        return q;
    });
};

export const deleteQuestionFromTree = (questions, id) => {
    return questions.filter(q => {
        if (q.id === id) return false;
        if (q.children && q.children.length > 0) {
            q.children = deleteQuestionFromTree(q.children, id);
        }
        return true;
    });
};

export const addChildToQuestion = (questions, parentId, newChild) => {
    return questions.map(q => {
        if (q.id === parentId) {
            return { ...q, children: [...(q.children || []), newChild] };
        }
        if (q.children && q.children.length > 0) {
            return { ...q, children: addChildToQuestion(q.children, parentId, newChild) };
        }
        return q;
    });
};
