import React from 'react';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionItem = ({
    question,
    path,
    onUpdate,
    onDelete,
    onAddChild,
    dragHandleProps, // Provided if it's a sortable root item
    isDragging
}) => {
    const handleTextChange = (e) => onUpdate(question.id, { text: e.target.value });
    const handleTypeChange = (e) => {
        const newType = e.target.value;
        onUpdate(question.id, { type: newType, mockAnswer: '' });
    };
    const handleMockAnswerChange = (e) => onUpdate(question.id, { mockAnswer: e.target.value });

    const showCondition = question.type === 'True/False';
    const showAddChild = showCondition && question.mockAnswer === 'True';

    return (
        <div className={`question-card ${isDragging ? 'dragging' : ''}`}>
            <div className="question-header">
                {dragHandleProps && (
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="question-drag-handle"
                        {...dragHandleProps}
                    >
                        <GripVertical size={20} />
                    </motion.div>
                )}
                <div className="question-number">Q{path}</div>

                <div className="input-group">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Define your parameter..."
                        value={question.text}
                        onChange={handleTextChange}
                    />
                    <select className="select-type" value={question.type} onChange={handleTypeChange}>
                        <option value="Short Answer">Short Answer</option>
                        <option value="True/False">True/False</option>
                    </select>
                </div>

                <motion.button
                    whileHover={{ scale: 1.1, rotate: 10, color: '#ff007f' }}
                    whileTap={{ scale: 0.9 }}
                    className="btn-icon"
                    onClick={() => onDelete(question.id)}
                    title="Delete Node"
                >
                    <Trash2 size={20} />
                </motion.button>
            </div>

            <AnimatePresence>
                {showCondition && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="condition-preview"
                    >
                        <span>If answer equals:</span>
                        <select className="condition-select" value={question.mockAnswer} onChange={handleMockAnswerChange}>
                            <option value="">Select value...</option>
                            <option value="True">True</option>
                            <option value="False">False</option>
                        </select>
                        {showAddChild && (
                            <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary"
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                                onClick={() => onAddChild(question.id)}
                            >
                                <Plus size={16} /> Mount Sub-question
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {question.children && question.children.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="subquestions-wrapper"
                    >
                        {question.children.map((child, index) => (
                            <motion.div
                                layout
                                key={child.id}
                                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                transition={{ type: 'spring', damping: 25, delay: index * 0.05 }}
                            >
                                <QuestionItem
                                    question={child}
                                    path={`${path}.${index + 1}`}
                                    onUpdate={onUpdate}
                                    onDelete={onDelete}
                                    onAddChild={onAddChild}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuestionItem;
