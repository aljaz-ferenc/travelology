import "./ErrorModal.scss";
import { AnimatePresence, motion } from "framer-motion";

export default function ErrorModal() {
  const variants = {
    hide: {
      transform: "translateY(-100%)",
    },
    show: {
      transform: "translateY(0)",
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={variants}
        initial="hide"
        animate="show"
        exit="hide"
        className="error-modal"
      >
        Every place needs coordinates
      </motion.div>
    </AnimatePresence>
  );
}
