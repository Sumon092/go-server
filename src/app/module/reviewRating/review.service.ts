import prisma from '../../../constants/prisma';

export const addReviewRating = async (
  serviceId: string,
  userId: string,
  data: any
) => {
  if (!userId) {
    throw new Error('User is not authenticated');
  }
  const newReviewRating = await prisma.reviewRating.create({
    data: {
      ...data,
      userId,
      serviceId,
    },
  });

  return newReviewRating;
};

export const getReviewsByUser = async () => {
  const reviews = await prisma.reviewRating.findMany({
    include: {
      user: true,
      services: true,
    },
  });
  return reviews;
};


export const ReviewService={
    addReviewRating,
    getReviewsByUser
}