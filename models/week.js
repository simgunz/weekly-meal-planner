const mongoose = require('mongoose');

const { Schema } = mongoose;

const WeekSchema = new Schema({
  days: [
    {
      meals: [
        {
          recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
        },
      ],
    },
  ],
});

mongoose.model('Week', WeekSchema);
