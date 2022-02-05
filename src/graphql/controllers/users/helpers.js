/* eslint-disable no-console */
const User = require('../../../models/User');

const buildAncestors = async (id, parentId) => {
  try {
    const parentCategory = await User.findOne(
      { _id: parentId },
      { name: 1, slug: 1, ancestors: 1 },
    ).exec();

    if (parentCategory) {
      const { _id, name, slug } = parentCategory;

      const ancest = [...parentCategory.ancestors];

      ancest.unshift({ _id, name, slug });

      await User.findByIdAndUpdate(id, {
        $set: { ancestors: ancest },
      });
    }
  } catch (err) {
    console.error(err.message);
  }
};

const buildHierarchyAncestors = async (coachId, parentId) => {
  if (coachId && parentId) {
    await buildAncestors(coachId, parentId);

    const result = await User.find({ parent: coachId });

    if (result) {
      result.forEach(async doc => {
        await buildHierarchyAncestors(doc._id, coachId);
      });
    }
  }
};

module.exports = {
  buildAncestors,
  buildHierarchyAncestors,
};
