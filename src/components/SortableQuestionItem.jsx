import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import QuestionItem from './QuestionItem';

const SortableQuestionItem = ({ question, index, onUpdate, onDelete, onAddChild }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: question.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 1,
        position: 'relative'
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            layout
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
                delay: index * 0.05
            }}
        >
            <QuestionItem
                question={question}
                path={(index + 1).toString()}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAddChild={onAddChild}
                dragHandleProps={{ ...attributes, ...listeners }}
                isDragging={isDragging}
            />
        </motion.div>
    );
};

export default SortableQuestionItem;
