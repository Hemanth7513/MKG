"use client";

import { motion } from "framer-motion";
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', padding: '100px', border: '1px dashed var(--secondary)', borderRadius: 'var(--radius-lg)' }}
        >
          <p style={{ fontWeight: 800, letterSpacing: '4px', opacity: 0.3 }}>NEW EXPERIENCE COMING SOON</p>
        </motion.div>
      </div>
    </main>
  );
}
