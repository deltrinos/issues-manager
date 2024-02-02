export default {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "video": {
        "type": "string"
      },
      "category": {
        "type": "string"
      },
      "userId": {
        "type": "string"
      },
      "comment": {
        "type": "string"
      }
    },
    "required": [
      "video",
      "category",
      "userId",
      "comment"
    ]
  }
} as const;
