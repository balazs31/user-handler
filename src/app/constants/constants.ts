export class Constants {
  public static PATTERNS = {
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+])[A-Za-z\d$@$!%*?&+]{8,}/,
    PHONE: /^\+[0-9]{8,12}|^[0-9]{7,12}/,
    USERNAME: /^([a-zA-Z0-9_]){4,20}/,
    FIRST_NAME: /([a-zA-Z-]){2,20}$/,
    LAST_NAME: /([a-zA-Z-]){2,20}$/
  };

  public static COMPONENTS = {
    USER_DETAIL: {
      ACTIONS: {
        value: "editUser",
        options: {
          edit: "editUser",
          add: "addUser"
        },
        titles: {
          edit: "Edit user",
          add: "Add user"
        },
        currentTitle: "Edit user"
      }
    }
  };

  public static ALERTS = {
    TYPE: {
      SUCCESS: "success",
      ERROR: "error",
      WARNING: "warning"
    },
    TITLE: {
      CREATED: "Created!",
      UPDATED: "Updated!",
      ERROR: "Whoops!",
      CONFIRM_CHOICE: "Are you sure?",
      DELETED: "Deleted!"
    },
    MESSAGE: {
      ERROR_MESSAGE: "Something went wrong. Please try later!",
      USER_CREATED: "User has been created.",
      CONFIRM_CHOICE: "You won't be able to revert this!",
      USER_DELETED: "User has been deleted.",
      USER_UPDATED: "User has been updated."
    },
    BUTTON_TEXT: {
      CONFIRM_DELETE_USER: "Yes, delete it!"
    },

    BUTTON_COLOR: {
      CONFIRM: "#3085d6",
      CANCEL: "#d33"
    }
  };

  public static VALIDATOR_MESSAGES = {
    REQUIRED: "Field is required",
    USERNAME: {
      MIN_LENGTH: "Minimum 4 characters",
      MAX_LENTH: "Maximum 20 characters",
      PATTERN:
        "Can only contain lowercase, uppercase letters, numbers and the '_'|'-' symbols",
      TAKEN: "Username is already taken"
    },
    FIRST_NAME: {
      MIN_LENGTH: "Minimum 2 characters",
      PATTERN:
        "Can only contain lowercase, uppercase letters and the '-' symbol"
    },
    LAST_NAME: {
      MIN_LENGTH: "Minimum 2 characters",
      PATTERN:
        "Can only contain lowercase, uppercase letters and the '-' symbol"
    },
    CURRENT_PASSWORD: {
      INCORRECT: "Incorrect password"
    },
    NEW_PASSWORD_1: {
      PATTERN:
        "Password must contain at least a symbol, an uppercase and a lowercase letter",
      PASSWORD_NOT_MATCH_CURRENT: "New password can not match the current one"
    },
    NEW_PASSWORD_2: {
      PASSWORDS_NOT_MATCH: "Passwords do not match"
    },
    EMAIL: {
      PATTERN: "Invalid email address",
      TAKEN: "Email address already taken"
    },
    PHONE: {
      PATTERN: "Please provide a valid phone number"
    }
  };

  public static USER_TABLE = {
    COLUMNS: [
      "#",
      "Username",
      "First",
      "Last",
      "Email",
      "Location",
      "Phone",
      "Modify"
    ]
  };
}
