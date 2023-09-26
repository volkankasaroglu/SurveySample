using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SurveySample.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddVoteCountToQuestionOption : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "voteCount",
                table: "QuestionOptions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "voteCount",
                table: "QuestionOptions");
        }
    }
}
