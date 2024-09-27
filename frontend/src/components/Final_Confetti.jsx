import React from 'react'
import Confetti from 'react-confetti'
import { AiFillCheckCircle } from 'react-icons/ai'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function Final_Confetti() {
  const [showConfetti, setShowConfetti] = React.useState(false)
  const [modalIsOpen, setModalIsOpen] = React.useState(false)

  const handleClick = () => {
    setShowConfetti(true)
    setModalIsOpen(true)
    setTimeout(() => setShowConfetti(false), 7000)
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        View Update
      </button>
      {showConfetti && <Confetti />}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="flex justify-center items-center h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <AiFillCheckCircle className="text-green-500 text-5xl mb-4" />
          <h2 className="text-2xl font-bold mb-4">Hurrah!</h2>
          <p className="mb-4">You have been selected to the job.</p>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Final_Confetti
