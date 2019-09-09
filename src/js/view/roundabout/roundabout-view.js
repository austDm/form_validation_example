const roundaboutEmptyTemplate = `
    <div class="roundabout__list-container roundabout__list-container--transition">
        <ul class="roundabout__list" data-list-order="2"></ul>
    </div>`;

const getRoundAboutElem = (nodeClass, order, active) =>
  active
    ? `<li class="roundabout__element roundabout__element--active ${nodeClass}" data-order="${order}"></li>`
    : `<li class="roundabout__element ${nodeClass}" data-order="${order}"></li>`;

const roundaboutTemplates = {
  roundaboutEmptyTemplate,
  getRoundAboutElem,
};

export default roundaboutTemplates;
