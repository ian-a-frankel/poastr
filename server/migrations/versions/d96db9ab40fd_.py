"""empty message

Revision ID: d96db9ab40fd
Revises: a829476278e8
Create Date: 2024-01-04 15:33:32.461158

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd96db9ab40fd'
down_revision = 'a829476278e8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('poast_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ancestry', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('poast_table', schema=None) as batch_op:
        batch_op.drop_column('ancestry')

    # ### end Alembic commands ###
