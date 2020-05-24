export const STRIPE_PLAN = "base";

export const ROLE = {
  OWNER: "OWNER",
  OFFICE_INSTRUCTOR: "OFFICE_INSTRUCTOR",
  OFFICE: "OFFICE",
  INSTRUCTOR: "INSTRUCTOR",
  MEMBER: "MEMBER",
};

export const MODAL_SIZE = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  BIG: "BIG",
};

export const PANEL_SIZE = {
  SMALL: "400px",
  MEDIUM: "650px",
  BIG: "800px",
};

export const CONTENT_SIZE = {
  SMALLEST: "200px",
  SMALLER: "400px",
  SMALL: "500px",
  MEDIUM: "800px",
  NORMAL: "960px",
  LARGE: "1100px",
};

export const SESSION_RECURRENCE = {
  ONCE: "ONCE",
  //EVERYDAY: "EVERYDAY",
  BY_WEEK: "BY_WEEK",
  //ON_DATE_EACH_MONTH: "ON_DATE_EACH_MONTH",
  //CUSTOM: "CUSTOM"
};

export const STATUS_REGISTERED = {
  TAKEN: "TAKEN",
  WAITING: "WAITING",
};

export const STATUS_SESSION = {
  TO_COME_UP: {
    label: "TO_COME_UP",
    type: "is-info",
  },
  IN_PROGRESS: {
    label: "IN_PROGRESS",
    type: "is-success",
  },
  COMPLETED: {
    label: "COMPLETED",
    type: "is-warning",
  },
};

export const SESSION_REPEAT = {
  ONE: { label: "ONE", value: 1 },
  TWO: { label: "TWO", value: 2 },
  THREE: { label: "THREE", value: 3 },
  FOUR: { label: "FOUR", value: 4 },
};

export const DAYS = {
  MONDAY: { label: "MONDAY", value: 1 },
  TUESDAY: { label: "TUESDAY", value: 2 },
  WEDNESDAY: { label: "WEDNESDAY", value: 3 },
  THURSDAY: { label: "THURSDAY", value: 4 },
  FRIDAY: { label: "FRIDAY", value: 5 },
  SATURDAY: { label: "SATURDAY", value: 6 },
  SUNDAY: { label: "SUNDAY", value: 7 },
};

export const LANG = {
  ENGLISH: {
    label: "ENGLISH",
    code: "en",
  },
  FRENCH: {
    label: "FRENCH",
    code: "fr",
  },
};

export const STATE_VALIDATION = {
  WAIT: "WAIT",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export const STATE_ORGANIZATION = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
  ARCHIVE: "ARCHIVE",
  UNDEFINED: "UNDEFINED",
};

export const TEMPLATE_SESSION_STATUS = {
  ARCHIVE: "ARCHIVE",
  GOING: "GOING",
};

export const STATISTIC = {
  ONE_MONTH: "ONE_MONTH",
  THREE_MONTHS: "THREE_MONTHS",
  SIX_MONTHS: "SIX_MONTHS",
  ONE_YEAR: "ONE_YEAR",
};
