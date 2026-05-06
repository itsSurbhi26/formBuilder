import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, Check, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createQuestion, updateQuestionInTree, deleteQuestionFromTree, addChildToQuestion } from './utils/formUtils';
import SortableQuestionItem from './components/SortableQuestionItem';

function App() {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('dynamicFormQuestions');
    return saved ? JSON.parse(saved) : [];
  });
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    localStorage.setItem('dynamicFormQuestions', JSON.stringify(questions));
  }, [questions]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddParent = () => {
    setQuestions([...questions, createQuestion()]);
  };

  const handleUpdate = (id, updates) => {
    setQuestions(updateQuestionInTree(questions, id, updates));
  };

  const handleDelete = (id) => {
    setQuestions(deleteQuestionFromTree(questions, id));
  };

  const handleAddChild = (parentId) => {
    setQuestions(addChildToQuestion(questions, parentId, createQuestion()));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      {/* Exquisite Background Elements */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <div className="bg-noise"></div>

      <div className="app-container">
        <motion.div
          className="header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="badge"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Hierarchy Engine v2
          </motion.div>
          <h1>Hierarchy <span className="highlight">Builder</span></h1>
          <p>Create dynamic and infinitely nested questions in seconds.</p>
        </motion.div>

        <motion.div
          className="form-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
            onClick={handleAddParent}
          >
            <Plus size={20} /> Add New Question
          </motion.button>

          <motion.button
            whileHover={{ scale: questions.length ? 1.02 : 1 }}
            whileTap={{ scale: questions.length ? 0.95 : 1 }}
            className="btn btn-success"
            onClick={() => setShowReview(true)}
            disabled={questions.length === 0}
          >
            <Play fill="currentColor" size={16} /> Deploy Target
          </motion.button>
        </motion.div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
            <motion.div layout className="question-list">
              <AnimatePresence>
                {questions.map((q, index) => (
                  <SortableQuestionItem
                    key={q.id}
                    question={q}
                    index={index}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    onAddChild={handleAddChild}
                  />
                ))}
              </AnimatePresence>

              {questions.length === 0 && (
                <motion.div
                  className="empty-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p>System awaiting initialization. Click "Add New Question" to begin constructing.</p>
                </motion.div>
              )}
            </motion.div>
          </SortableContext>
        </DndContext>

        <AnimatePresence>
          {showReview && (
            <motion.div
              className="submission-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="submission-modal"
                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 40 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <h2>Configuration Payload</h2>
                <div className="modal-content">
                  <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Target JSON hierarchy ready for deployment.</p>
                  <pre>
                    {JSON.stringify(questions, null, 2)}
                  </pre>
                </div>
                <div className="modal-actions">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-icon"
                    onClick={() => setShowReview(false)}
                    style={{ padding: '0.6rem 2rem', background: 'var(--accent-fuchsia)', color: 'white', border: 'none' }}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
