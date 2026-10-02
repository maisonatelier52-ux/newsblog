export const formatDate = (iso, long = false) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: long ? "long" : "short", day: "numeric", year: "numeric" }) : "";