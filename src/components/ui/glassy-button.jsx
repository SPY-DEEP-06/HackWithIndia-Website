import React from 'react';
import { motion } from "framer-motion";

const GlassyButton = ({ children, className, ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
                relative flex items-center justify-center 
                px-8 py-3 
                rounded-[40px] 
                overflow-hidden
                text-black font-bold uppercase tracking-widest
                transition-all duration-300
                ${className}
            `}
            style={{
                background: "linear-gradient(180deg, rgb(255, 255, 255) 0%, rgb(201, 201, 201) 9%, rgb(161, 161, 161) 32%, rgb(117, 117, 117) 73%, rgb(255, 255, 255) 100%)",
                boxShadow: `
                    0px 1px 0.5px 0px rgba(0, 0, 0, 0), 
                    0px 2px 1px 0px rgba(0, 0, 0, 0), 
                    0px 4px 2px 0px rgba(0, 0, 0, 0.01), 
                    0px 7px 3px 0px rgba(0, 0, 0, 0.01), 
                    0px 11px 5px 0px rgba(0, 0, 0, 0.02), 
                    0px 19px 9px 0px rgba(0, 0, 0, 0.03), 
                    0px 32px 16px 0px rgba(0, 0, 0, 0.05), 
                    4px 60px 30px 0px rgba(0, 0, 0, 0.1), 
                    inset 0px 0px 1px 1px rgba(255, 255, 255, 0.5)
                `,
            }}
            {...props}
        >
            {/* Inner Content Layer for "Inset" feeling */}
            <div className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </div>

            {/* Shine Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.button>
    );
};

export default GlassyButton;
