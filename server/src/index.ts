import dotenv from 'dotenv';
dotenv.config();

import app from './server';

(async () => {

    const port = Number(process.env.PORT || 4000);

    // start the Express server
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
})();