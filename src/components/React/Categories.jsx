const Categories = ({ tags, handleTagClick }) => {

    return(
    <ul id="tags">
            {["Masa muscular", "Adelgazamiento", "Fuerza", "Dietas", "Rutinas", "Otros"].map((tag) => (
                <li
                    key={tag}
                    className={`categorie ${tags.includes(tag) ? "selected" : ""}`}
                    onClick={() => handleTagClick(tag)}
                    style={{ cursor: "pointer" }}
                >
                    {tag}
                </li>
            ))};
        </ul>
    )
}

export default Categories;