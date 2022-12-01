type BoxProps = {
  i: number;
};

export function Box({ i }: BoxProps) {
  return (
    <div
      style={{
        height: "48px",
        width: "48px",
        border: "1px solid black",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem",
      }}
    >
      {i}
    </div>
  );
}
