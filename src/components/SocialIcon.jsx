function SocialIcon({ href, name }) {
  return (
    <a href={href}>
      <box-icon
        type="logo"
        name={name}
        className="mr-[10px] inline-flex size-[30px] rounded-lg border"
      ></box-icon>
    </a>
  );
}
export default SocialIcon;
